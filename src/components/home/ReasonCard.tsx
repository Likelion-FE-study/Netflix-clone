interface ReasonCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function ReasonCard({
  title,
  description,
  icon,
}: ReasonCardProps) {
  return (
    <article className="relative min-h-[270px] overflow-hidden rounded-[22px] bg-gradient-to-br from-[#192247] via-[#17152f] to-[#210e17] px-7 py-7 md:min-h-[290px]">
      <h3 className="max-w-[90%] text-[21px] font-bold leading-[1.35] md:text-[23px]">
        {title}
      </h3>

      <p className="mt-5 max-w-[90%] text-[16px] leading-[1.5] text-[#b3b3b3] md:text-[17px]">
        {description}
      </p>

      <img
        src={icon}
        alt=""
        aria-hidden="true"
        className="absolute bottom-5 right-5 h-[70px] w-[70px] object-contain md:h-[76px] md:w-[76px]"
      />
    </article>
  );
}