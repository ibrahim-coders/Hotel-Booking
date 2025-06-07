import React, { useEffect } from 'react';
import Glide from '@glidejs/glide';
import { FaStar, FaRegStar, FaQuoteLeft } from 'react-icons/fa';

export default function CarouselTestimonial() {
  useEffect(() => {
    const slider = new Glide('.glide-08', {
      type: 'carousel',
      focusAt: 1,
      animationDuration: 4000,
      autoplay: 4500,
      rewind: true,
      perView: 2,
      gap: 48,
      classes: {
        nav: {
          active: '[&>*]:bg-wuiSlate-700',
        },
      },
      breakpoints: {
        1024: {
          perView: 2,
        },
        640: {
          perView: 1,
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  const testimonials = [
    {
      id: 1,
      quote:
        "Wind-ui, is probably one of the best libraries I've came across. Good looking, easy to use and above all super accessible.",
      rating: 4,
      name: 'Bill Gates',
      role: 'CEO, Microsoft',
      avatar: 'https://i.pravatar.cc/40?img=11',
    },
    {
      id: 2,
      quote:
        'Wind-ui components come with proper attributes to ensure full accessibility with the WAI-ARIA standards.',
      rating: 5,
      name: 'Jane Smith',
      role: 'WAI-ARIA, Representative',
      avatar: 'https://i.pravatar.cc/40?img=25',
    },
    {
      id: 3,
      quote:
        "You can easily communicate with Wind-ui's team for support through their discord channel. They are responsive and ultra helpful guys!",
      rating: 4,
      name: 'Arnold Jones',
      role: 'Software Engineer',
      avatar: 'https://i.pravatar.cc/40?img=7',
    },
  ];

  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-amber-400" />
        ) : (
          <FaRegStar key={i} className="text-amber-400" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="glide-08 relative w-full">
      {/* Slides */}
      <div data-glide-el="track">
        <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0 pb-12">
          {testimonials.map(testimonial => (
            <li key={testimonial.id}>
              <div className="h-full w-full px-2">
                <div className="h-full overflow-hidden rounded bg-white text-slate-500 shadow-2xl shadow-slate-200">
                  <div className="relative p-6">
                    <figure className="relative z-10">
                      <blockquote className="p-6 text-lg leading-relaxed">
                        <p>{testimonial.quote}</p>
                      </blockquote>
                      <figcaption className="flex flex-col items-start gap-2 p-6 pt-0 text-sm text-emerald-500">
                        <div
                          className="flex gap-1"
                          role="img"
                          aria-label={`Rating: ${testimonial.rating} out of 5 stars`}
                        >
                          {renderStars(testimonial.rating)}
                        </div>
                        <div className="flex items-center gap-4 pt-4 text-sm text-emerald-500">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            title={testimonial.name}
                            width="48"
                            height="48"
                            className="max-w-full shrink-0 rounded-full"
                          />
                          <div className="flex flex-col gap-1">
                            <span className="font-bold uppercase">
                              {testimonial.name}
                            </span>
                            <cite className="not-italic">
                              {testimonial.role}
                            </cite>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                    <FaQuoteLeft className="absolute left-6 top-6 z-0 h-16 w-16 text-emerald-50" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Indicators */}
      <div
        className="-mt-6 flex w-full items-center justify-center gap-2"
        data-glide-el="controls[nav]"
      >
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.id}
            className="group p-4"
            data-glide-dir={`=${index}`}
            aria-label={`goto slide ${index + 1}`}
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 opacity-70 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
        ))}
      </div>
    </div>
  );
}
