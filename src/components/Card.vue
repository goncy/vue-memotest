<template>
  <article :class='`Card mw5 bg-white br3 pa3 ma1 ${statusStyles} ${shown && "flipped"}`' @click='onClick(card)'>
    <div class='flipper'>
      <div class='front'>
        <div class='tc flex justify-center items-center'>
          <div class='br-100 h4 w4 ba pa2 flex justify-center items-center b--black-10'>
            <i class='black fa fa-question' />
          </div>
        </div>
      </div>
      <div class='back'>
        <div class='tc flex justify-center items-center'>
          <div class='br-100 h4 w4 ba pa2 flex justify-center items-center b--white'>
            <i :class='`white fa fa-${card.icon}`' />
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'card',
  props: {
    card: Object,
    onClick: Function,
    status: String
  },
  computed: {
    statusStyles: function () {
      switch (this.status) {
        case 'unmatched':
          return 'bg-light-red ba b--white'
        case 'picked':
          return 'bg-light-blue ba b--white'
        case 'revealed':
          return 'bg-light-green ba b--white'
        case 'disabled':
          return 'ba b--black-10'
        default:
          return 'hover-bg-light-gray grow pointer ba b--black-10'
      }
    },
    shown: function () {
      return ['unmatched', 'picked', 'revealed'].includes(this.status)
    }
  }
}
</script>

<style scoped lang='scss'>
.Card {
  transition: all .4s;
  max-width: 162px;
  max-height: 162px;
  perspective: 1000px;
  transform: rotateY(0deg);

  .fa {
    font-size: 3rem;
  }

  .flipper {
    transform-style: preserve-3d;
    width: 128px;
    height: 128px;
  }

  .front {
    transition: all .4s;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    transform: rotateY(0deg);
  }

  .back {
    transition: all .4s;
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    transform: rotateY(180deg);
  }

  &.flipped {
    transform: rotateY(180deg);

    .front {
      z-index: 2;
      transform: rotateY(180deg);
    }

    .back {
      transform: rotateY(0deg);

      .fa {
        transform: rotateY(180deg);
        backface-visibility: visible;
      }
    }
  }
}
</style>
