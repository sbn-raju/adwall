import React from "react";
import { Star, UserCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="max-w-md mx-auto">
      <div className="p-6 bg-gray-800 shadow-lg rounded-2xl border ">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4">
            {testimonial.image ? (
              <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full" />
            ) : (
              <UserCircle2 className="w-16 h-16 text-white" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
          <p className="text-sm text-white">{testimonial.role}</p>
          <div className="flex gap-1 mt-2 text-yellow-500">
            {[...Array(5)].map((_, index) => (
              <Star key={index} className="w-5 h-5" fill={index < testimonial.rating ? "#facc15" : "none"} stroke="#facc15" />
            ))}
          </div>
          <p className="mt-4 text-white">"{testimonial.review}"</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      role: "Marketing Manager",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      review: "This advertising service boosted our business visibility tremendously! Highly recommended!"
    },
    {
      name: "Jane Smith",
      role: "CEO, Brandify",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4,
      review: "Great service and fantastic results. Will definitely use again!"
    },
    {
        name: "Pushpa",
        role: "CEO, RedWood Sindicate",
        image: "https://randomuser.me/api/portraits/men/40.jpg",
        rating: 3,
        review: "This advertising service boosted our business visibility tremendously! Highly recommended!"
      },
  ];

  return (
    <>
    <h2 className="text-2xl font-semibold text-center text-white">Testimonials</h2>
    <div className="px-5 bg-gray-900 flex flex-wrap justify-center gap-6 flex-row">
       
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} />
      ))}
    </div>
    </>
  );
}
