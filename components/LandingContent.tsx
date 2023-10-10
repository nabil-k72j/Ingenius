"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "Darius",
    avatar: "A",
    title: "Software Engineer",
    description: "this is the best AI saas tool i've used.",
  },
  {
    name: "Loubon",
    avatar: "L",
    title: "Professional Diver",
    description: "i like making picture of cute fish.",
  },
  {
    name: "Haniko",
    avatar: "H",
    title: "Freedom fighter",
    description:
      "this app allows me to figure out new tactics to destroy my enemies and free Palestine.",
  },
  {
    name: "Ryan",
    avatar: "H",
    title: "front end developer",
    description: "this AI code generator makes my work so much easier.",
  },
];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.name}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{testimonial.name}</p>
                  <p className="text-zinc-400 text-sm">{testimonial.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {testimonial.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
