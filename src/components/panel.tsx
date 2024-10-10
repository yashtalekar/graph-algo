// components/Panel.tsx

type PanelProps = {
    title: string;
    text: string;
  };
  
  const Panel: React.FC<PanelProps> = ({ title, text }) => {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <div className="text-xl font-medium text-black">{title}</div>
        <p className="text-gray-500">{text}</p>
      </div>
    );
  };
  
  export default Panel;
  