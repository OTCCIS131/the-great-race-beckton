$(function () {
    let vm = new Vue({
        el: '#game',
        data: {
            racing: false,
            winner: null,
            harry: 0,
            snitch: 0,
            tick: 0,
            interval: null
        },
        computed: {
            winning() {
                if (this.harry == this.snitch) return null

                return this.harry > this.snitch ? 'Harry' : 'Snitch'
            },
            harryStyle() {
                return {
                    left: `${this.harry}vw`
                }
            },
            harryClass() {
                if (!this.winner) return
                return this.winner == 'Harry' ? 'animated tada infinite winner' : 'animated hinge'
            },
            snitchStyle() {
                return {
                    left: `${this.snitch}vw`
                }
            },
            snitchClass() {
                if (!this.winner) return
                return this.winner == 'Snitch' ? 'animated tada infinite winner' : 'animated hinge'
            }
        },
        methods: {
            startRace() {
                if (this.winner) {
                    this.restart()
                    return
                }
                this.racing = true

                this.interval = setInterval(() => {
                    this.progressPlayers()
                }, 50)
            },
            progressPlayers() {
                this.tick++
                this.harry += (Math.random() >= Math.random()) ? 1 : 0
                this.snitch += (Math.random() >= Math.random()) ? 1 : 0
                this.checkVictory()
            },
            checkVictory() {
                if (this.harry == this.snitch) return

                if (this.harry >= 90) {
                    this.declareVictory('Harry')
                }

                if (this.snitch >= 90) {
                    this.declareVictory('Snitch')
                }
            },
            declareVictory(player) {
                clearInterval(this.interval)
                this.interval = null
                this.racing = false
                this.winner = player
            },
            restart() {
                this.racing = false
                this.winner = null
                this.harry = 0
                this.snitch = 0
                this.tick = 0
            }
        }
    })
});
