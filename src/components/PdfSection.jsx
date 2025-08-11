import DeliveredCard from "./card";

const cardData = [
  {
    title: "Orbit",
    description:
      "At our Creative Digital Agency, we bring your ideas to life by crafting engaging, impactful digital experiences that captivate audiences and drive results.",
    link: "https://drive.google.com/file/d/1Y--kfUAlgf-wDjXB3M8ddn9umkOUTVhx/view?usp=drive_link",
  },
  {
    title: "PropertyNexus",
    description:
      "Expert real estate and mortgage solutions to help you find, finance, and secure your perfect property.",
    link: "https://drive.google.com/file/d/1zpa-RIkJBZPKO1rVvkymolXhiJrgpUvS/view?usp=drive_link",
  },
  {
    title: "Zentrix Solutions",
    description:
      "Transform your business with innovative IT solutions that enhance efficiency, security, and growth.",
    link: "https://zentrick-solutions.vercel.app/",
  },
  {
    title: "ShopSphere",
    description:
      "Shop the latest trends with unbeatable prices and fast delivery. Your perfect product is just a click away.",
      link: "#",

  },
  {
    title: "SigmaVault",
    description:
      "Professional investment management, cutting-edge market insights, and personalized strategies to help you achieve your financial goals.",
       link: "https://drive.google.com/file/d/1Tt8YIlN2xFBQRtamkK1GKELMbNnU2pOw/view?usp=drive_link",
  },
];

const ProjectLinks = () => {
  return (
    <section className="bg-black py-10 overflow-hidden">
      <div className="max-w-[1576px] mx-auto px-4">
       <h2 className="font-poppins text-[20px] sm:text-[28px] font-medium leading-[100%] tracking-[-0.01em] text-white text-center mb-6">
  Showcasing Our Projects
</h2>

        <div className="flex gap-[24px] overflow-x-auto scrollbar-hide">
          {cardData.map((card, index) => (
            <DeliveredCard
              key={index}
              title={card.title}
              description={card.description}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectLinks ;
