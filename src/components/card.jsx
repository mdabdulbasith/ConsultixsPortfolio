import { ArrowRight } from "lucide-react";

const DeliveredCard = ({ title, description, link, isPdf = false }) => {
  return (
    <div className="w-[250px] h-[226px] p-4 rounded-[16px] bg-gradient-to-b from-[#006587] to-[#055EF2] text-white flex flex-col justify-between flex-shrink-0">
      <div>
        <h3 className="font-poppins text-[28px] font-medium not-italic leading-[100%] tracking-[-0.01em] text-white mb-2">
          {title}
        </h3>

        <p className="text-base font-normal not-italic leading-[1.2] tracking-[-0.0em] text-[#E4E4E4]">
          {description}
        </p>
      </div>

      <div className="flex justify-end">
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-white flex items-center justify-center hover:scale-105 transition"
          >
            <ArrowRight size={16} className="text-white" />
          </a>
        ) : (
          <div
            className="w-8 h-8 rounded-full border border-white flex items-center justify-center opacity-50 cursor-not-allowed"
            title={isPdf ? "PDF coming soon" : ""}
          >
            <ArrowRight size={16} className="text-white" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveredCard;
