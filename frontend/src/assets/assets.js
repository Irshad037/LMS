import logo from './logo.svg'
import logo_dark from './logo_dark.svg'
import search_icon from './search_icon.svg'
import cross_icon from './cross_icon.svg'
import upload_area from './upload_area.svg'
import sketch from './sktech.svg'
import microsoft_logo from './microsoft_logo.svg'
import walmart_logo from './walmart_logo.svg'
import accenture_logo from './accenture_logo.svg'
import adobe_logo from './adobe_logo.svg'
import paypal_logo from './paypal_logo.svg'
import course_1_thumbnail from './course_1.png'
import course_2_thumbnail from './course_2.png'
import course_3_thumbnail from './course_3.png'
import course_4_thumbnail from './course_4.png'
import course_5_thumbnail from './course_5.png'
import course_6_thumbnail from './course_6.png'
import course_7_thumbnail from './course_7.png'
import course_8_thumbnail from './course_8.png'
import star from './rating_star.svg'
import star_blank from './star_dull_icon.svg'
import profile_img_1 from './profile_img_1.png'
import profile_img_2 from './profile_img_2.png'
import profile_img_3 from './profile_img_3.png'
import arrow_icon from './arrow_icon.svg'
import down_arrow_icon from './down_arrow_icon.svg'
import time_left_clock_icon from './time_left_clock_icon.svg'
import time_clock_icon from './time_clock_icon.svg'
import user_icon from './user_icon.svg'
import home_icon from './home_icon.svg'
import add_icon from './add_icon.svg'
import my_course_icon from './my_course_icon.svg'
import person_tick_icon from './person_tick_icon.svg'
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import file_upload_icon from './file_upload_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import dropdown_icon from './dropdown_icon.svg'
import patients_icon from './patients_icon.svg'
import play_icon from './play_icon.svg'
import blue_tick_icon from './blue_tick_icon.svg'
import course_4 from './course_4.png'
import profile_img from './profile_img.png'
import profile_img2 from './profile_img2.png'
import profile_img3 from './profile_img3.png'
import lesson_icon from './lesson_icon.svg'


export const assets = {
    logo,
    search_icon,
    sketch,
    microsoft_logo,
    walmart_logo,
    accenture_logo,
    adobe_logo,
    paypal_logo,
    course_1_thumbnail,
    course_2_thumbnail,
    course_3_thumbnail,
    course_4_thumbnail,
    star,
    star_blank,
    profile_img_1,
    profile_img_2,
    profile_img_3,
    arrow_icon,
    dropdown_icon,
    cross_icon,
    upload_area,
    logo_dark,
    down_arrow_icon,
    time_left_clock_icon,
    time_clock_icon,
    user_icon,
    home_icon,
    add_icon,
    my_course_icon,
    person_tick_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    course_4,
    file_upload_icon,
    appointments_icon,
    earning_icon,
    patients_icon,
    profile_img,
    profile_img2,
    profile_img3,
    play_icon,
    blue_tick_icon,
    lesson_icon
}

export const dummyEducatorData = {
    "_id": "675ac1512100b91a6d9b8b24",
    "name": "GreatStack",
    "email": "user.greatstack@gmail.com",
    "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yclFkaDBOMmFqWnBoTTRBOXZUanZxVlo0aXYifQ",
    "createdAt": "2024-12-12T10:56:17.930Z",
    "updatedAt": "2024-12-12T10:56:17.930Z",
    "__v": 0
}

export const dummyTestimonial = [
    {
        name: 'Donald Jackman',
        role: 'SWE 1 @ Amazon',
        image: assets.profile_img_1,
        rating: 5,
        feedback: 'I\'ve been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.',
    },
    {
        name: 'Richard Nelson',
        role: 'SWE 2 @ Samsung',
        image: assets.profile_img_2,
        rating: 4,
        feedback: 'I\'ve been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.',
    },
    {
        name: 'James Washington',
        role: 'SWE 2 @ Google',
        image: assets.profile_img_3,
        rating: 4.5,
        feedback: 'I\'ve been using Imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.',
    },
];

export const dummyDashboardData = {
    "totalEarnings": 707.38,
    "enrolledStudentsData": [
        {
            "courseTitle": "Introduction to JavaScript",
            "student": {
                "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
                "name": "Great Stack",
                "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ"
            }
        },
        {
            "courseTitle": "Advanced Python Programming",
            "student": {
                "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
                "name": "Great Stack",
                "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ"
            }
        },
        {
            "courseTitle": "Web Development Bootcamp",
            "student": {
                "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
                "name": "Great Stack",
                "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ"
            }
        },
        {
            "courseTitle": "Data Science with Python",
            "student": {
                "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
                "name": "Great Stack",
                "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ"
            }
        },
        {
            "courseTitle": "Cybersecurity Basics",
            "student": {
                "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
                "name": "Great Stack",
                "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ"
            }
        }
    ],
    "totalCourses": 8
}

export const dummyStudentEnrolled = [
    {
        "student": {
            "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
            "name": "GreatStack",
            "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ"
        },
        "courseTitle": "Introduction to JavaScript",
        "purchaseDate": "2024-12-20T08:39:55.509Z"
    },
    {
        "student": {
            "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
            "name": "GreatStack",
            "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ"
        },
        "courseTitle": "Introduction to JavaScript",
        "purchaseDate": "2024-12-20T08:59:49.964Z"
    },
    {
        "student": {
            "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
            "name": "GreatStack",
            "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ"
        },
        "courseTitle": "Advanced Python Programming",
        "purchaseDate": "2024-12-20T11:03:42.931Z"
    },
    {
        "student": {
            "_id": "user_2qQlvXyr02B4Bq6hT0Gvaa5fT9V",
            "name": "GreatStack",
            "imageUrl": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ycVFsdmFMSkw3ckIxNHZMU2o4ZURWNEtmR2IifQ"
        },
        "courseTitle": "Web Development Bootcamp",
        "purchaseDate": "2024-12-20T11:04:48.798Z"
    }
]

export const dummyCoursesPlayer = [
  {
    title: "Full Stack Web Development",
    description: "Master MERN Stack and build real-world projects.",
    instructor: "64fbd5d2a1c88a6d12123abc", // Replace with valid ObjectId
    category: "Web Development",
    thumbnail: "/course_1.png",
    coursePrice: 4999,
    discount: 20,
    content: [
      {
        sectionTitle: "Introduction",
        videos: [
          {
            title: "Welcome to the Course",
            videoUrl: "https://example.com/video1.mp4",
            duration: "05:12",
            publicId: "video1_public_id"
          },
          {
            title: "Course Structure Overview",
            videoUrl: "https://example.com/video2.mp4",
            duration: "07:45",
            publicId: "video2_public_id"
          }
        ]
      },
      {
        sectionTitle: "Frontend Development",
        videos: [
          {
            title: "HTML & CSS Basics",
            videoUrl: "https://example.com/video3.mp4",
            duration: "12:30",
            publicId: "video3_public_id"
          }
        ]
      }
    ],
    enrolledStudents: [],
    reviews: [],
    averageRating: 4
  },
  {
    title: "Mastering Python for Data Science",
    description: "Learn Python from basics to advanced and start your Data Science career.",
    instructor: "64fbd5d2a1c88a6d12123abc",
    category: "Data Science",
    thumbnail: "/images/python_ds.png",
    coursePrice: 2999,
    discount: 10,
    content: [
      {
        sectionTitle: "Getting Started with Python",
        videos: [
          {
            title: "Installing Python",
            videoUrl: "https://example.com/video4.mp4",
            duration: "06:10",
            publicId: "video4_public_id"
          }
        ]
      }
    ],
    enrolledStudents: [],
    reviews: [],
    averageRating: 3
  },
  {
    title: "UI/UX Design Fundamentals",
    description: "Learn how to design beautiful and user-friendly interfaces.",
    instructor: "64fbd5d2a1c88a6d12123abc",
    category: "Design",
    thumbnail: "/images/uiux.png",
    coursePrice: 1999,
    discount: 15,
    content: [
      {
        sectionTitle: "UI Basics",
        videos: [
          {
            title: "What is UI Design?",
            videoUrl: "https://example.com/video5.mp4",
            duration: "08:00",
            publicId: "video5_public_id"
          }
        ]
      }
    ],
    enrolledStudents: [],
    reviews: [],
    averageRating:4
  }

];

// export const dummyCourses = [
//   {
//     _id: "course1",
//     title: "Web Development Bootcamp",
//     description: "Learn HTML, CSS, JavaScript, and React from scratch.",
//     thumbnail: "/course_1.png",
//     category: "Web Development",
//     coursePrice: 499,
//     discount: 20,
//     instructor: {
//       name: "John Doe",
//       profileImg: "/instructor1.png"
//     },
//     averageRating: 4.5,

//     // ✅ Added enrolledStudents
//     enrolledStudents: [
//       {
//         _id: "student1",
//         name: "Alice Johnson",
//         email: "alice@example.com",
//         profileImg: "/student1.png"
//       },
//       {
//         _id: "student2",
//         name: "Bob Smith",
//         email: "bob@example.com",
//         profileImg: "/student2.png"
//       }
//     ]
//   },

//   {
//     _id: "course2",
//     title: "Python for Data Science",
//     description: "Master Python, Pandas, and data analysis techniques.",
//     thumbnail: "/course_2.png",
//     category: "Data Science",
//     coursePrice: 799,
//     discount: 25,
//     instructor: {
//       name: "Jane Smith",
//       profileImg: "/instructor2.png"
//     },
//     averageRating: 4.7,

//     // ✅ Added enrolledStudents
//     enrolledStudents: [
//       {
//         _id: "student3",
//         name: "Charlie Brown",
//         email: "charlie@example.com",
//         profileImg: "/student3.png"
//       }
//     ]
//   }
// ];

// export const dummyCourses = [
//   {
//     _id: "1",
//     title: "Cloud Computing Essentials",
//     instructor: "GreatStack",
//     averageRating: 5,
//     reviewsCount: 1,
//     coursePrice: 55.99,
//     thumbnail: course_1_thumbnail
//   },
//   {
//     _id: "2",
//     title: "Advanced Python Programming",
//     instructor: "GreatStack",
//     averageRating: 4,
//     reviewsCount: 1,
//     coursePrice: 67.99,
//     thumbnail: course_2_thumbnail
//   },
//   {
//     _id: "3",
//     title: "Web Development Bootcamp",
//     instructor: "GreatStack",
//     averageRating: 5,
//     reviewsCount: 1,
//     coursePrice: 74.99,
//     thumbnail: course_3_thumbnail
//   },
//   {
//     _id: "4",
//     title: "Cybersecurity Basics",
//     instructor: "GreatStack",
//     averageRating: 4,
//     reviewsCount: 1,
//     coursePrice: 59.49,
//     thumbnail: course_4_thumbnail
//   }
// ];

export const dummyCourses = [
  {
    _id: "1",
    title: "Cloud Computing Essentials",
    instructor: "GreatStack",
    averageRating: 5,
    reviewsCount: 1,
    coursePrice: 55.99,
    thumbnail: course_1_thumbnail
  },
  {
    _id: "2",
    title: "Advanced Python Programming",
    instructor: "GreatStack",
    averageRating: 4,
    reviewsCount: 1,
    coursePrice: 67.99,
    thumbnail: course_2_thumbnail
  },
  {
    _id: "3",
    title: "Web Development Bootcamp",
    instructor: "GreatStack",
    averageRating: 5,
    reviewsCount: 1,
    coursePrice: 74.99,
    thumbnail: course_3_thumbnail
  },
  {
    _id: "4",
    title: "Cybersecurity Basics",
    instructor: "GreatStack",
    averageRating: 4,
    reviewsCount: 1,
    coursePrice: 59.49,
    thumbnail: course_4_thumbnail
  },
  {
    _id: "5",
    title: "Introduction to Data Science",
    instructor: "CodeWithHarry",
    averageRating: 4.5,
    reviewsCount: 3,
    coursePrice: 89.99,
    thumbnail: course_5_thumbnail
  },
  {
    _id: "6",
    title: "Machine Learning with Python",
    instructor: "TechWorld",
    averageRating: 4.8,
    reviewsCount: 7,
    coursePrice: 95.00,
    thumbnail: course_6_thumbnail
  },
  {
    _id: "7",
    title: "UI/UX Design Fundamentals",
    instructor: "DesignLab",
    averageRating: 4.3,
    reviewsCount: 5,
    coursePrice: 49.99,
    thumbnail: course_7_thumbnail
  },
  {
    _id: "8",
    title: "React for Beginners",
    instructor: "GreatStack",
    averageRating: 4.9,
    reviewsCount: 10,
    coursePrice: 64.99,
    thumbnail: course_8_thumbnail
  },
];





