import Image from "next/image";
import { withBasePath } from "../utils/basePath";

export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="section-title flex justify-start items-center mb-10">
      <Image
        src={withBasePath("/images/apple-icon.png")}
        alt="Apple's Photo"
        width={30}
        height={30}
        className="rounded-lg"
        priority
      />
      &nbsp;&nbsp;&nbsp;
      <h2 className="pt-1">{title}</h2>
    </div>
  );
}
