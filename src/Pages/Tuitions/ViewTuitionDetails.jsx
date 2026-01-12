import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  FaBook,
  FaUserGraduate,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClock,
  FaPaperPlane,
  FaTimes,
  FaStar,
  FaUserCircle,
  FaCheckCircle,
  FaGraduationCap,
  FaRegCalendarCheck,
  FaPhone,
  FaEnvelope,
  FaShieldAlt,
  FaArrowLeft,
  FaImages,
  FaEdit,
  FaTrash
} from "react-icons/fa";
import { MdOutlineDescription, MdEmail, MdPhone } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { BsCheckCircleFill } from "react-icons/bs";
import Loading from "../../Components/Loading/Loading";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

// Mock images for tuition posts
const tuitionImages = [
  "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
];

const TuitionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [relatedTuitions, setRelatedTuitions] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  
  const { data: tuition, isLoading, isError, refetch } = useQuery({
    queryKey: ["singleTuition", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions/${id}`);
      return res.data;
    },
  });

  
  const { data: tuitionReviews, refetch: refetchReviews } = useQuery({
    queryKey: ["tuitionReviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?tuitionId=${id}`);
      return res.data;
    },
    enabled: !!id,
  });


  const { data: relatedData } = useQuery({
    queryKey: ["relatedTuitions", tuition?.subject],
    queryFn: async () => {
      if (!tuition?.subject) return [];
      const res = await axiosSecure.get(`/tuitions?subject=${tuition.subject}&limit=3`);
      return res.data.tuitions?.filter(t => t._id !== id) || [];
    },
    enabled: !!tuition?.subject,
  });


  useEffect(() => {
    if (user?.email && tuition?._id) {
 
      axiosSecure.get(`/applications/check?email=${user.email}&tuitionId=${tuition._id}`)
        .then(res => {
          setAlreadyApplied(res.data.alreadyApplied);
        })
        .catch(() => setAlreadyApplied(false));


      setIsOwner(user.email === tuition.email);
    }

   
    if (tuitionReviews) {
      setReviews(tuitionReviews);
    }

    if (relatedData) {
      setRelatedTuitions(relatedData);
    }
  }, [user, tuition, axiosSecure, tuitionReviews, relatedData]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      qualifications: "",
      experience: "",
      expectedSalary: "",
      phone: "",
      additionalInfo: "",
    },
  });

  const handleApply = () => {
    if (!user?.email) {
      Swal.fire({
        icon: "warning",
        title: "Please login first!",
      }).then(() => navigate("/login"));
      return;
    }

    if (isOwner) {
      Swal.fire({
        icon: "warning",
        title: "Cannot Apply",
        text: "You cannot apply to your own tuition post.",
      });
      return;
    }

    setSelectedTuition(tuition);
    reset();
    setOpenModal(true);
  };

  const handleFormSubmit = (data) => {
    const tutorInfo = {
      ...data,
      email: user?.email,
      profilePhoto: user?.photoURL,
      trackingId: tuition.trackingId,
      tuitionPostId: tuition?._id,
      tuitionPostName: tuition?.name,
      tuitionPostSubject: tuition?.subject,
      tuitionPostClass: tuition?.class,
      tuitionPostBudget: tuition?.budget,
      tuitionPostLocation: tuition?.location,
      tuitionPostDays: tuition?.days,
      tuitionPostEmail: tuition?.email,
      tuitionPostTime: tuition?.timing,
      tuitionPostClassStatus: tuition?.classStatus,
      status: "pending",
      date: new Date(),
    };

    axiosSecure.post("/applications", tutorInfo)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Application submitted!",
            timer: 1200,
            showConfirmButton: false,
          });
          setAlreadyApplied(true);
          setOpenModal(false);
          refetch();
        }
      })
      .catch((err) => {
        if (err?.response?.status === 400) {
          setAlreadyApplied(true);
        }
        Swal.fire({
          icon: "error",
          title: "Already Applied",
          text: err?.response?.data?.message || err.message,
        });
      });
  };

  const handleDeleteTuition = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This tuition post will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tuitions/${id}`)
          .then(() => {
            Swal.fire('Deleted!', 'Tuition post has been deleted.', 'success');
            navigate("/tuitions");
          })
          .catch(() => {
            Swal.fire('Error!', 'Failed to delete tuition.', 'error');
          });
      }
    });
  };

  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-red-500 mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Failed to Load Details</h2>
          <p className="text-gray-600 mb-6">The tuition details could not be loaded.</p>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-primary flex items-center gap-2 mx-auto"
          >
            <FaArrowLeft /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 btn btn-ghost flex items-center gap-2 hover:bg-secondary-100"
        >
          <FaArrowLeft /> Back to Tuitions
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">
         
            <div className=" rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{tuition.subject} Tuition</h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      tuition.status === "approved" ? "bg-primary-100 text-primary-600" :
                      tuition.status === "pending" ? "bg-yellow-100 text-primary-600" :
                      "bg-red-100 text-primary-800"
                    }`}>
                      {tuition.status?.charAt(0).toUpperCase() + tuition.status?.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600">Posted on {new Date(tuition.createdAt).toLocaleDateString()}</p>
                </div>
                {isOwner && (
                  <div className="flex gap-2">
              
                    <button 
                      onClick={handleDeleteTuition}
                      className="btn btn-outline btn-error btn-sm flex items-center gap-2"
                    >
                      <FaTrash /> 
                    </button>
                  </div>
                )}
              </div>

              {/* Image Gallery */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <FaImages className="text-blue-600" />
                  <h3 className="text-lg font-semibold">Gallery</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {tuitionImages.map((img, index) => (
                    <div
                      key={index}
                      className={`relative h-48 rounded-lg overflow-hidden cursor-pointer transition-transform ${
                        selectedImage === index ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={img}
                        alt={`Tuition ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <img
                    src={tuitionImages[selectedImage]}
                    alt="Selected"
                    className="w-full h-64 rounded-xl object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className=" rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <MdOutlineDescription className="text-blue-600 text-xl" />
                <h2 className="text-2xl font-bold text-gray-900">Description & Requirements</h2>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Looking for an experienced tutor to teach {tuition.subject} for {tuition.class} level student. 
                  The student needs assistance with {tuition.days} days per week at {tuition.timing}.
                </p>
                <div className="bg-secondary-50 rounded-xl p-4">
                  <h4 className="font-semibold flex  mb-2"><FaBook></FaBook> Additional Requirements:</h4>
                  <ul className="list-disc pl-5 text-secondary-600 space-y-1">
                    <li>Minimum 2 years of teaching experience</li>
                    <li>Strong communication skills</li>
                    <li>Ability to provide study materials</li>
                    <li>Regular progress reports</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className=" rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-500 text-xl" />
                  <h2 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h2>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{calculateAverageRating()}</div>
                  <div className="flex gap-1 mb-1">
                    {renderStars(Number(calculateAverageRating()))}
                  </div>
                  <div className="text-sm text-gray-600">Based on {reviews.length} reviews</div>
                </div>
              </div>

              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review._id} className="border rounded-xl p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={review.avatar || "https://via.placeholder.com/40"}
                            alt={review.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h4 className="font-semibold">{review.name}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                  {reviews.length > 3 && (
                    <button className="btn btn-outline w-full">
                      Show All Reviews ({reviews.length})
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaStar className="text-gray-300 text-4xl mx-auto mb-3" />
                  <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Key Information Card */}
            <div className=" rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tuition Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-seconadry-50 rounded-xl">
                  <FaBook className="text-primary-600" />
                  <div>
                    <p className="text-sm ">Subject</p>
                    <p className="font-semibold">{tuition.subject}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
                  <FaUserGraduate className="text-primary-600" />
                  <div>
                    <p className="text-sm text-primary-600">Class Level</p>
                    <p className="font-semibold text-secondary-600">{tuition.class}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
                  <FaMapMarkerAlt className="text-primary-600" />
                  <div>
                    <p className="text-sm text-primary-600">Location</p>
                    <p className="font-semibold text-secondary-600">{tuition.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
                  <FaMoneyBillWave className="text-primary-600" />
                  <div>
                    <p className="text-sm text-primary-600">Budget</p>
                    <p className="font-semibold text-lg text-secondary-600">${tuition.budget}/month</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
                  <FaCalendarAlt className="text-primary-600" />
                  <div>
                    <p className="text-sm text-primary-600">Schedule</p>
                    <p className="font-semibold text-secondary-600">{tuition.days} days/week • {tuition.timing}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
                  <FaClock className="text-primary-600" />
                  <div>
                    <p className="text-sm text-primary-600">Duration</p>
                    <p className="font-semibold text-secondary-600">3 months minimum</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl">
                  <HiOutlineAcademicCap className="text-primary-600" />
                  <div>
                    <p className="text-sm text-primary-600">Class Status</p>
                    <p className="font-semibold capitalize text-secondary-600">{tuition.classStatus?.replace('_', ' ')}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl">
                  <FaShieldAlt className="text-primary-600" />
                  <div>
                    <p className="text-sm text-primary-600">Payment Status</p>
                    <p className="font-semibold capitalize text-secondary-600">{tuition.paymentStatus}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className=" rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaUserCircle className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Posted By</p>
                    <p className="font-semibold">{tuition.name || "Anonymous"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MdEmail className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{tuition.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MdPhone className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">{tuition.phoneNumber || "Not provided"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="sticky top-6">
              {!alreadyApplied ? (
                <button
                  onClick={handleApply}
                  disabled={isOwner}
                  className={`w-full btn btn-primary btn-lg flex items-center justify-center gap-2 ${
                    isOwner ? "btn-disabled" : ""
                  }`}
                >
                  <FaPaperPlane className="text-lg" />
                  {isOwner ? "Your Own Post" : "Apply Now"}
                </button>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                  <BsCheckCircleFill className="text-green-500 text-4xl mx-auto mb-3" />
                  <h3 className="font-bold text-green-800 mb-1">Application Submitted!</h3>
                  <p className="text-green-600">Your application is under review</p>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>Status: <span className="font-semibold">Pending</span></p>
                    <p>Applied on: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Related Tuitions */}
            {relatedTuitions.length > 0 && (
              <div className=" rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tuitions</h3>
                <div className="space-y-4">
                  {relatedTuitions.map((related) => (
                    <Link
                      key={related._id}
                      to={`/tuitions/${related._id}`}
                      className="block border rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-900">{related.subject}</h4>
                          <p className="text-sm text-gray-600">{related.class} • {related.location}</p>
                        </div>
                        <span className="font-bold text-blue-600">${related.budget}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                        <FaCalendarAlt className="text-xs" />
                        <span>{related.days} days/week</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

         {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className=" shadow-2xl p-7 rounded-2xl w-96 animate-[zoomIn_0.25s_ease]">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                <FaPaperPlane /> Apply for {selectedTuition?.subject}
              </h2>
              <FaTimes
                className=" cursor-pointer hover:text-red-500"
                onClick={() => setOpenModal(false)}
              />
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

              <div>
                <label className="text-sm font-medium flex items-center gap-1">
                  <FaUserGraduate /> Name
                </label>
                <input
                  {...register("name")}
                  className="w-full p-2 rounded-2xl border focus:ring-1 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  value={user?.email}
                  readOnly
                  className="w-full p-2 rounded-2xl border bg-gray-100"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Qualifications</label>
                <input
                  {...register("qualifications")}
                  className="w-full p-2 rounded-2xl border"
                  placeholder="Your qualifications"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Experience</label>
                <input
                  {...register("experience")}
                  className="w-full p-2 rounded-2xl border"
                  placeholder="Teaching Experience"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Expected Salary</label>
                <input
                  type="number"
                  {...register("expectedSalary")}
                  className="w-full p-2 rounded-2xl border"
                  placeholder="Expected Salary"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="flex-1 py-2 bg-gray-300 rounded-2xl hover:bg-gray-400 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 py-2 bg-primary-300 text-white rounded-2xl font-semibold hover:bg-primary-600 transition"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default TuitionDetailsPage;