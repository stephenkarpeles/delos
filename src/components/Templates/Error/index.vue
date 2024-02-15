<template>
  <section class="error-container container">
    <div class="error row">
      <div class="col-12 error__content">
        <h1 v-html="statusCode"></h1>
        <h2
          v-if="statusCode === 500"
          v-html="'Oops! Something went wrong.'"
        />
        <h2
          v-if="statusCode === 403"
          v-html="'Sorry! Access forbidden.'"
        />
        <h2
          v-if="statusCode === 404"
          v-html="'We’re sorry! The page you’re looking for is missing.'"
        />

        <p
          v-if="statusCode === 500"
          v-html="'We’re not entirely sure what happend, but please try again.'"
        />
        <p
          v-if="statusCode === 403"
          v-html="'The page you’re trying to access has restricted access. If you think this is a mistake, please contact your admin.'"
        />
        <p
          v-if="statusCode === 404"
          v-html="'Not to worry, get back on the road to health and wellness.'"
        />

        <div class="link-wrapper">
          <a href="/" class="Btn Btn--primary">
          <span class="Btn__contents">
            <span class="Btn__label">Back to Home</span>
          </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['error'],
  computed: {
    statusCode () {
      return (this.error && this.error.statusCode) || 500
    }
  },
  head () {
    return {
      title: `${this.statusCode} | Delos`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/src/assets/scss/_imports.scss";

$_transform: 80px;

.error-page {
  margin-bottom: $module-offset;
  @include media(">=desktop") {
    width: 100vw;
    height: 100vh;
    margin-bottom: 0;
    overflow: hidden;
  }
}

.error {
  //@include flex(column-reverse, flex-start, center);
  //flex-wrap: nowrap;
  //margin: 0 40px;
  //
  //@include media(">=desktop") {
  //  @include flex(row, flex-start, center);
  //  margin-left: $_transform / 2;
  //}

  //&__image {
  //  position: relative;
  //  z-index: -1;
  //
  //  @include media(">=desktop") {
  //    transform: translateX(-$_transform);
  //  }
  //
  //  img {
  //    @include media("<=tablet") {
  //      width: 110vw;
  //    }
  //  }
  //}

  &__content {
    margin-top: 140px;
  }

  h1 {
    margin-bottom: 24px;
    color: $blue;
    font-style: normal;
    font-weight: bold;
    font-size: 86.7451px;
    line-height: 93px;
    /* identical to box height, or 107% */
    text-align: center;
  }

  h2 {
    margin-bottom: 24px;
    color: #091F40;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
    /* identical to box height */
    text-align: center;
    letter-spacing: 0.002em;
  }

  p {
    max-width: 550px;
    margin: 0 auto 36px auto;
    color: #091F40;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    /* or 24px */
    text-align: center;
    letter-spacing: 0.002em;
  }

  .link-wrapper {
    width: 100%;
    text-align: center;
  }
}

</style>
