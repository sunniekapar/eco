export default function Background() {
  return (
    <div className="absolute w-full h-full -z-10 ">
      <div
        className="absolute bottom-0 left-0 right-0 top-0 
                     bg-[size:24px_1px] [mask-image:radial-gradient(ellipse_60%_35%_at_50%_0%,#000_70%,transparent_100%)]
                     bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#fafafa2e_1px,transparent_1px)] 
                     dark:bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] "
      />
      <div className="animate-blob absolute left-40 mix-blend-multiply right-0 -top-16 h-[310px] w-[310px] rounded-full bg-green-700 opacity-15 blur-[100px]"></div>
      <div className="animate-blob absolute left-40 mix-blend-multiply animation-delay-2000 right-0 -top-16 h-[310px] w-[310px] rounded-full bg-emerald-700 opacity-15 blur-[100px]"></div>
      <div className="animate-blob absolute left-40 mix-blend-multiply animation-delay-4000 right-0 -top-16 h-[310px] w-[310px] rounded-full bg-teal-700 opacity-15 blur-[100px]"></div>
    </div>
  );
}
