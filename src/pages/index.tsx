import { Container, Spacer } from "@nextui-org/react";

import { ExerciseSection } from "components/home/ExerciseSection";
import { HeroSection } from "components/home/HeroSection";
import { EntrySection } from "components/home/EntrySection";
import { CommunitySection } from "components/home/CommunitySection";

export default function Home() {
  return (
    <main>
      <Container lg css={{ px: "$18", mt: "$12", "@mdMax": { px: "$10" } }}>
        <HeroSection />
        <Spacer y={2} />
        <ExerciseSection />
        <Spacer y={2} />
        <EntrySection />
        <Spacer y={2} />
        <CommunitySection />
      </Container>
    </main>
  );
}
