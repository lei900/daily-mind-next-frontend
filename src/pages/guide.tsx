import { Text, Spacer, Container } from "@nextui-org/react";

const Guide = () => {
  return (
    <Container md css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
      <Text size="$3xl">Lorem ipsum dolor sit amet</Text>
      <Text size="$lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Purus gravida quis
        blandit turpis. Augue neque gravida in fermentum et sollicitudin ac
        orci. Et sollicitudin ac orci phasellus egestas. Elementum tempus
        egestas sed sed risus pretium quam vulputate. Interdum velit euismod in
        pellentesque massa placerat duis ultricies.
      </Text>
      <Spacer y={1} />
      <Text size="$lg">
        Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui.
        Praesent semper feugiat nibh sed pulvinar. Ultrices gravida dictum fusce
        ut placerat orci nulla pellentesque. Malesuada proin libero nunc
        consequat interdum varius sit amet. Lectus quam id leo in vitae. Sed
        viverra tellus in hac habitasse platea dictumst. Vivamus at augue eget
        arcu. Augue mauris augue neque gravida in.
      </Text>
      <Spacer y={1} />
      <Text size="$lg">
        Tincidunt vitae semper quis lectus nulla at volutpat diam. Gravida
        dictum fusce ut placerat. Erat velit scelerisque in dictum non. Tempus
        quam pellentesque nec nam aliquam sem et tortor consequat. Eu nisl nunc
        mi ipsum faucibus. Cras fermentum odio eu feugiat pretium nibh. Vel
        pharetra vel turpis nunc eget lorem dolor sed viverra. Sollicitudin
        tempor id eu nisl nunc mi ipsum faucibus. Sed id semper risus in
        hendrerit gravida rutrum. Eget nulla facilisi etiam dignissim. Erat
        imperdiet sed euismod nisi. Risus in hendrerit gravida rutrum quisque
        non tellus orci ac.
      </Text>
      <Spacer y={1} />
    </Container>
  );
};

export default Guide;
