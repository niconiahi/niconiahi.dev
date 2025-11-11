<script lang="ts">
  type Project = {
    title: string;
    description: string;
    date: Date;
    image: string;
  };

  const { project } = $props<{ project: Project }>();

  const date = $derived(
    project.date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
  );

  let tilt_x = $state(0);
  let tilt_y = $state(0);
  const max_tilt = 10;

  function handle_mouse_move(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const normalized_x = x * 2 - 1;
    const normalized_y = y * 2 - 1;
    tilt_x = -normalized_y * max_tilt;
    tilt_y = normalized_x * max_tilt;
    target.style.transform = `perspective(800px) rotateX(${tilt_x}deg) rotateY(${tilt_y}deg)`;
  }

  function handle_mouse_leave(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    tilt_x = 0;
    tilt_y = 0;
    target.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`;
  }
</script>

<article onmousemove={handle_mouse_move} onmouseleave={handle_mouse_leave}>
  <img alt="jejejejejej" src={project.image} />
  <h3>{project.title}</h3>
  <span>Posted · {date}</span>
  <p>{project.description}</p>
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    outline: 2px solid transparent;
    outline-offset: 2px;
    transition:
      transform 100ms ease-out,
      outline-color 100ms ease-out;
    border-radius: 0.25rem;
    transform-style: preserve-3d;

    &:hover {
      outline-color: var(--neutral-600);
      background-color: var(--neutral-200);
      cursor: pointer;
    }
  }

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
  }

  img {
    box-shadow: 2px 2px 6px var(--neutral-400);
    border-radius: 0.25rem;
  }

  span {
    color: var(--neutral-600);
    font-size: 0.75rem;
    font-weight: bold;
  }
</style>
