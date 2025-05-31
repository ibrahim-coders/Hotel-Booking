const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center ">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-live="polite"
        aria-busy="true"
        aria-labelledby="title-08a desc-08a"
        className="h-12 w-12"
      >
        <title id="title-08a">Loading</title>
        <desc id="desc-08a">Animated loading spinner</desc>
        <path d="M7 8H3V16H7V8Z" className="animate-bounce fill-sky-500" />
        <path
          d="M14 8H10V16H14V8Z"
          className="animate-bounce fill-sky-500 [animation-delay:.2s]"
        />
        <path
          d="M21 8H17V16H21V8Z"
          className="animate-bounce fill-sky-500 [animation-delay:.4s]"
        />
      </svg>
    </div>
  );
};

export default Spinner;
