<script lang="ts">
  import Title from "$lib/components/title.svelte";
  import Card from "./components/card.svelte";
  type Project = {
    title: string;
    description: string;
    date: Date;
    image: string;
  };
  const projects: Project[] = [
    {
      title: "Etherenauta",
      description:
        "The initial idea here was to do a deep dive into a Web API that I was requiring to understand fully in order to use it for another project: a web torrent client. This technology is called WebRTC and it's used to create a channel in which pairs can share data with each other once established",
      date: new Date(2025, 5, 25),
      image:
        "https://media.gettyimages.com/id/1454065258/photo/couple-standing-on-top-of-a-cliff-looking-at-sunset-lanzarote-spain.jpg?s=612x612&w=0&k=20&c=i1EBYi6nZjHVZwiMPr1yFe10od-M6OUMcuF8En1e_XI=",
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
