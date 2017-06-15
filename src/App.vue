<template>
  <div class='App vh-100 w-100'>
    <p class='pv2 center f3 helvetica ma0 b'>
      Nivel
      <span class='light-green'>{{level}}</span>
      <span> - </span>
      Puntos:
      <span class='light-green'>{{points}}</span>
    </p>
    <board :cards='cards' :onCardClicked='onCardClicked' :picked='picked' :revealed='revealed' />
  </div>
</template>

<script>
import Board from './components/Board'

import ICONS from '../static/icons.json'

const CARDS_PER_LEVEL = 2
const INITIAL_LEVEL = 1

export default {
  name: 'app',
  components: {
    Board
  },
  data() {
    return {
      level: INITIAL_LEVEL,
      timer: Date.now(),
      points: 0,
      cards: this.getCards(INITIAL_LEVEL),
      revealed: [],
      picks: {
        first: null,
        second: null
      }
    }
  },
  computed: {
    picked: function () {
      return Object.values(this.picks).filter(e => !!e)
    }
  },
  methods: {
    onCardClicked: function (card) {
      let { first, second } = this.picks

      if (first && second) return
      if (this.revealed.includes(card)) return
      if (first === card || second === card) return

      if (!first) return this.picks.first = card
      else if (!second) this.picks.second = card

      this.checkMatch(this.picks.first, this.picks.second)
    },
    checkMatch: function (first, second) {
      if (first.icon === second.icon) {
        this.revealed.push(first, second)
        this.picks = {
          first: null,
          second: null
        }
        this.checkWin()
      } else {
        setTimeout(() => {
          this.picks = {
            first: null,
            second: null
          }
        }, 750)
      }
    },
    getCards: function (level) {
      const cards = this.shuffleCards(ICONS).slice(0, level * CARDS_PER_LEVEL)

      const Acards = cards.map(card => ({ icon: card, type: 'a' }))
      const Bcards = cards.map(card => ({ icon: card, type: 'b' }))

      return this.shuffleCards([].concat(Acards, Bcards))
    },
    getPoints: function (ms) {
      const levelPoints = Math.round(((((CARDS_PER_LEVEL * this.level) * 10000) - ms) * this.level) / 4)

      return this.points + (levelPoints < 0 ? 0 : levelPoints)
    },
    shuffleCards: function (cards) {
      let currentIndex = cards.length
      let temporaryValue
      let randomIndex

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        temporaryValue = cards[currentIndex]
        cards[currentIndex] = cards[randomIndex]
        cards[randomIndex] = temporaryValue
      }

      return cards
    },
    checkWin: function () {
      if (this.revealed.length === this.cards.length) {
        setTimeout(() => {
          this.level += 1
          this.points = this.getPoints(Date.now() - this.timer)
          this.timer = Date.now() + 1000
          this.cards = this.getCards(this.level)
          this.revealed = []
          this.picks = {
            first: null,
            second: null
          }
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
.App {
  display: grid;
}
</style>
