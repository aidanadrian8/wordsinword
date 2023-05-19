<template>
  <nav class="navbar navbar-expand-lg border-bottom shadow shadow-lg">
    <div class="container-fluid">
        <li class="nav-item dropdown-end" style="list-style:none;">
          <a class="navbar-brand btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">WordSack</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Log In</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" href="#">Sign Up</a></li>
          </ul>
        </li>
      <button class="navbar-toggler btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <ToolTip class="nav-link" tooltip="1:A,E,I,O,U,L,N,S,T,R 2:D,G 3:B,C,M,P 4:F,H,V,W,Y 5:K 8:J,X 10:Q,Z"
              position="bottom"><i class="fa-solid fa-circle-info"></i></ToolTip>
          </li>
          <li class="nav-item">
            <ToolTip class="nav-link" position="bottom" tooltip="Help"><i class="fa-solid fa-circle-question"></i>
            </ToolTip>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import ToolTip from './ToolTip.vue';
export default {
  name: "NavBar",
  components: {
    ToolTip
  },
  data() {
    return {

    }
  }

}

</script>
<style></style>