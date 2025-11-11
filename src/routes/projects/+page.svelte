<script lang="ts">
  import Title from "$lib/components/title.svelte";
  import Card from "./components/card.svelte";
  import ethernauta_img from "$lib/assets/ethernauta.png";
  import peer_to_peer_videoconference_img from "$lib/assets/peer-to-peer-videoconference.png";
  import ariabones_img from "$lib/assets/ariabones.png";
  import morfar_img from "$lib/assets/morfar.png";
  type Project = {
    title: string;
    description: string;
    date: Date;
    image: string;
  };
  const projects: Project[] = [
    {
      title: "Etherenauta",
      date: new Date(2025, 7, 20),
      image: ethernauta_img,
      description:
        `This open-source library allows you to interact with the Ethereum's blockchain in a type-safe manner`.trim(),
    },
    {
      title: "Morfar",
      date: new Date(2025, 7, 20),
      image: morfar_img,
      description:
        `Restaurant management application which helps owners set dietary restrictions for their products automatically

On the other end, users get completely reliable dietary restrictions's filters when navigating the restaurant's menu`.trim(),
    },
    {
      title: "Peer-to-peer videoconference application",
      date: new Date(2024, 5, 9),
      image: peer_to_peer_videoconference_img,
      description:
        `Google Meet alternative which allows you to connect call another peorson without signing up`.trim(),
    },
    {
      title: "Ariabones",
      date: new Date(2024, 5, 9),
      image: ariabones_img,
      description:
        `Modular and atomic unstyled web components that you can easily install and use

You take care of the styles, the library takes care of the accessibility`.trim(),
    },
  ];
</script>

<Title>Projects</Title>
<main>
  {#each projects as project}
    <Card {project} />
  {/each}
</main>

<style>
  main {
    padding-inline: 2.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: masonry;
    gap: 1rem;
  }
</style>
