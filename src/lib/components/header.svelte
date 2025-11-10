<header>
  <a href="/" aria-label="Home">
    <div class="logo"></div>
  </a>
  <div class="right">
    <nav>
      <ul>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/blog">Blog</a></li>
      </ul>
    </nav>
    <div class="bottom">
      <span>The personal website of Nicolas Accetta</span>
      <div>
        <div class="ball"></div>
        <span class="bold">Live now:</span>Coding using Neovim
      </div>
    </div>
  </div>
</header>

<style>
  header {
    display: flex;
    padding-inline-start: 2.5rem;
    border-bottom: 1px solid var(--neutral-500);
  }
  .logo {
    width: 3.75rem;
    height: 3.75rem;
    background: var(--red);
  }
  ul a {
    text-decoration: none;
    color: var(--neutral-1000);
    font-size: 1rem;
    padding-inline: 1rem;
    height: 100%;
    display: flex;
    align-items: center;
    transition: all 150ms ease-in;

    &:hover {
      background: var(--neutral-300);
    }
  }
  li {
    list-style: none;
    width: fit-content;
    border-right: 1px solid var(--neutral-500);
    height: 100%;
    display: flex;
    align-items: center;
  }
  .right {
    width: 100%;
  }
  ul {
    display: flex;
    align-items: center;
    height: 2.5rem;
    border-bottom: 1px solid var(--neutral-500);
  }
  .right {
    display: flex;
    flex-direction: column;
  }
  .right {
    width: 100%;
  }
  .bottom {
    display: flex;
    height: 1.25rem;
    font-size: 0.75rem;
  }
  .bottom > * {
    display: flex;
    align-items: center;
    padding-inline: 1rem;
    border-right: 1px solid var(--neutral-300);
  }
  .bottom > div {
    display: flex;
    align-items: center;
  }
  .bottom > span {
    font-style: italic;
  }
  .bold {
    font-weight: bold;
    margin-right: 0.25rem;
  }
  .ball {
    width: 6px;
    height: 6px;
    background: var(--red);
    border-radius: 50%;
    margin-right: 0.5rem;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 6px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
</style>
