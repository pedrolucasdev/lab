type PropType = {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
};

const AnimationExample: React.FC<PropType> = (props) => {
  const { title, description, children } = props;
  return (
    <div className="flex flex-col mt-10">
      <h2 className="text-blue-600">{title}</h2>
      <h3 className="text-gray-600">{description}</h3>
      <div className="flex w-full border round h-[50svh] md:h-[40svh] lg:h-[60svh] mt-4">
        {children}
      </div>
    </div>
  );
};

export default AnimationExample;
