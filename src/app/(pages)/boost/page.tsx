"use client";
import BoostMenu from "@/app/components/boost/BoostMenu";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
const BoostPage: React.FC = () => {
  return (
    <main>
      <div className="flex justify-center flex-col">
        <Link href={"/"} className="flex items-center pl-4 pt-8">
          <ArrowLongLeftIcon className="h-8 w-8" />
          <p className="ml-2">back</p>
        </Link>
        <BoostMenu />
      </div>
    </main>
  );
};

export default BoostPage;
