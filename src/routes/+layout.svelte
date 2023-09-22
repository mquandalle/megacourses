<script>
  import "./index.css";
</script>

<div class="container mx-auto mt-10 mb-10">
  <a href="/">
    <h1
      class="logo text-4xl mb-5 inline-block text-center"
      style="line-height:0.8em"
    >
      <span class="font-bold" style="letter-spacing: 1px;">MEGA</span><br />
      <span class="text-3xl text-purple-700">Courses</span>
    </h1>
  </a>

  <hr class="my-4" />

  <slot />
</div>

<style>
  .logo:hover {
    animation: scale 0.3s ease-in-out infinite alternate;
  }

  @keyframes scale {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.3) rotate(-3deg);
    }
  }
</style>
