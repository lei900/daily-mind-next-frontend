import { Spacer } from "@nextui-org/react";

import { CommunityList } from "components/communities/communityList";

export const CommunitySection = () => {
  return (
    <section className="text-gray-800 mx-auto">
      <header className="container mx-auto flex sm:flex-row justify-start items-center">
        <h1 className="title sm:text-3xl text-2xl mb-4 font-bold text-gray-700">
          コミュニティ
        </h1>
        <Spacer x={0.5} />
        <p className="text-gray-600 sm:text-base text-sm">
          みんなで励まし合いましょう
        </p>
      </header>
      <CommunityList />
    </section>
  );
};
