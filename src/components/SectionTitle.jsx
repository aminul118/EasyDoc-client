const SectionTitle = ({ heading, text }) => {
  return (
    <div className="text-center max-w-xl mx-auto space-y-3 pb-8">
      <h1 className="text-3xl lg:text-5xl font-bold ">{heading}</h1>
      <p className="text-black/90">{text}</p>
    </div>
  );
};

export default SectionTitle;
