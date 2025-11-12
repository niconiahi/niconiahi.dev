<script lang="ts">
  import Title from "$lib/components/title.svelte";
  import Card, { type Project } from "./components/card.svelte";
  import ethernauta_img from "$lib/assets/ethernauta.png";
  import peer_to_peer_videoconference_img from "$lib/assets/peer-to-peer-videoconference.png";
  import ariabones_img from "$lib/assets/ariabones.png";
  import morfar_img from "$lib/assets/morfar.png";
  import animatronik_img from "$lib/assets/animatronik.png";
  import olga_img from "$lib/assets/olga.png";
  import cryptoman_img from "$lib/assets/cryptoman.png";

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
      date: new Date(2025, 4, 11),
      image: morfar_img,
      description:
        `Restaurant management application which helps owners set dietary restrictions for their products automatically

On the other end, users get completely reliable dietary restrictions's filters when navigating the restaurant's menu`.trim(),
    },
    {
      title: "Olga",
      date: new Date(2024, 4, 5),
      image: olga_img,
      description:
        `This application extracts all chapters for every uploaded video for every show of a streaming channel called Olga

It then lists these chapters with the corresponding link that navigates to the expected video in the expected time`.trim(),
    },
    {
      title: "Cryptoman",
      date: new Date(2025, 8, 7),
      image: cryptoman_img,
      description: `An Ethereum wallet written completely from scratch

It uses the base building blocks provided by my other project, Ethernauta`.trim(),
    },
    {
      title: "Peerference",
      date: new Date(2024, 5, 9),
      image: peer_to_peer_videoconference_img,
      description:
        `Google Meet alternative which allows you to call another person without signing up`.trim(),
    },
    {
      title: "Animatronik",
      date: new Date(2024, 4, 18),
      image: ariabones_img,
      description: `Share your CSS collectible with the world

The foundational technology used is blockchain NFTs`.trim(),
    },
    {
      title: "Ariabones",
      date: new Date(2024, 1, 19),
      image: animatronik_img,
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
    padding-bottom: 4rem;
  }
</style>
