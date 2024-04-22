function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      winner: null,
      myHealth: 100,
      computerHealth: 100,

      // Saldiri Sayisini Tutuyoruz
      currentRound: 0,
    };
  },
  watch: {

    // Oynayan Kisinin Kalan Can Durumunu Kontrol Ediyoruz
    // Oyun Bittiginde Hem Kisinin Hem de Bilgisayarin Cani Kalmadiginda 
    // Beraberlik Durumu Olacak
    // Diger Durumda Bilgisayar Kazanacak
    myHealth(value) {
      if (value <= 0 && this.computerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'computer';
      }
    },

    // Oynayan Kisinin Kalan Can Durumunu Kontrol Ediyoruz
    // Oyun Bittiginde Hem Kisinin Hem de Bilgisayarin Cani Kalmadiginda 
    // Beraberlik Durumu Olacak
    // Diger Durumda Oyuncu Kazanacak
    computerHealth(value) {
      if (value <= 0 && this.myHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'me';
      }
    },
  },
  computed: {
    computerBarStyles() {
      if (this.computerHealth < 0) {
        return { width: '0%' };
      } else {
        return { width: this.computerHealth + '%' };
      }
    },
    myBarStyles() {
      if (this.myHealth < 0) {
        return { width: '0%' };
      } else {
        return { width: this.myHealth + '%' };
      }
    },

    // Saldiri Sayisi 4 Oldugunda
    // SuperAttack Butonu Aktif Olacak
    possibleSpecialAttack() {
      return this.currentRound % 4 !== 0;
    },
  },
  methods: {
    attackToComputer() {

      // Saldiri Sayisini Artiriyoruz
      this.currentRound++;
      const attackValue = getRandomValue(7, 15);
      this.computerHealth -= attackValue;
      this.attackMe();
    },
    attackMe() {
      const attackValue = getRandomValue(10, 20);
      this.myHealth -= attackValue;
    },
    specialAttack() {

      // Saldiri Sayisini Artiriyoruz
      this.currentRound++;
      const attackValue = getRandomValue(15, 30);
      this.computerHealth -= attackValue;
      this.attackMe();
    },
    healMe() {

      // Saldiri Sayisini Artiriyoruz
      this.currentRound++;
      const healValue = getRandomValue(15, 20);
      if (this.myHealth + healValue > 100) {
        this.myHealth = 100;
      } else {
        this.myHealth += healValue;
      }
      this.attackMe();
    },
    newGame() {
      this.myHealth = 100;
      this.computerHealth = 100;
      this.winner = null;
      this.currentRound = 0;
    },
  },
});

app.mount('#frontend');