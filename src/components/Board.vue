<template>
  <div class='Board center'>
    <div class='flex flex-wrap justify-center'>
      <div v-for='card in cards'>
        <card :onClick='onCardClicked' :card='card' :status='getCardStatus(card)' />
      </div>
    </div>
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'board',
  components: {
    Card
  },
  props: {
    cards: Array,
    onCardClicked: Function,
    picked: Array,
    revealed: Array
  },
  methods: {
    getCardStatus: function (card) {
      if (this.revealed.includes(card)) return 'revealed'
      else if (this.picked.includes(card)) {
        if (this.picked.find(c => c.icon !== card.icon)) return 'unmatched'
        else return 'picked'
      }
      else if (this.picked.length === 2) return 'disabled'
      else return 'default'
    }
  }
}
</script>

<style scoped>
@media (max-width: 1360px) {
  .Board {
    max-width: 680px;
  }
}

@media (min-width: 1361px) {
  .Board {
    max-width: 1360px;
  }
}
</style>
