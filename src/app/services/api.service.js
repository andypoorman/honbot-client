class ApiService {

    constructor($http, BaseUrl, socket, $analytics) {
        'ngInject';
        this.$analytics = $analytics;
        this.$http = $http;
        this.socket = socket;

        this.host = BaseUrl.host;

        this.apiWatching = false;
        this.matches = {};
        this.updatesList = [];
        this.updateWatching = false;
    }
    apiCalls(callback) {
        // keeps count of api calls to 
        if (!this.apiWatching) {
            this.socket.on('api', function(data) {
                callback(data);
            });
            this.apiWatching = true;
        }
    }
    updates(callback) {
        if (!this.updateWatching) {
            this.$analytics.eventTrack('api', {
                category: 'main',
                label: 'recentPlayers'
            });

            // pull list of recent players
            this.$http.get(`${this.host}/recentPlayers`).success((res) => {
                this.updatesList = this.updatesList.concat(res);
                callback(this.updatesList);
            });

            // subscribe to new players being updated
            this.socket.on('update', (data) => {
                this.updatesList.unshift(data);
                this.updatesList = _.dropRight(this.updatesList);
                callback(this.updatesList);
            });
            this.updateWatching = true;
        }
        callback(this.updatesList);
    }
    counts() {
        this.$analytics.eventTrack('api', {
            category: 'main',
            label: 'counts'
        });
        return this.$http.get(`${this.host}/counts`);
    }
    singlePlayer(nickname) {
        // return a single player stats
        this.$analytics.eventTrack('api', {
            category: 'player',
            label: nickname
        });
        return this.$http({
            method: 'GET',
            url: `${this.host}/player/${nickname}`,
            cache: true
        });
    }
    bulkPlayers(pids) {
        // takes list of playerid's and returns cached stats for each player
        this.$analytics.eventTrack('api', {
            category: 'players',
            label: 'bulk'
        });
        return this.$http({
            method: 'GET',
            url:`${this.host}/bulkPlayers/${pids}`,
            cache: true
        });
    }
    history(pid, mode, page) {
        this.$analytics.eventTrack('api', {
            category: 'history',
            label: pid
        });
        return this.$http.get(`${this.host}/history/${pid}/${page}/${mode}`);
    }
    match(id, callback, error) {
        this.$analytics.eventTrack('api', {
            category: 'match',
            label: id
        });
        if (!this.matches[id]) {
            this.$http.get(`${this.host}/match/${id}`).success(res => {
                if (res !== '') {
                    this.matches[id] = res;
                    callback(res);
                } else {
                    error();
                }
            });
        } else {
            callback(this.matches[id]);
        }
    }
    playerCache(pid, mode) {
        this.$analytics.eventTrack('api', {
            category: 'playerCache',
            label: pid
        });
        return this.$http({
            method: 'GET',
            url: `${this.host}/cache/${pid}/${mode}`,
            cache: true
        });
    }
    saveMatches(data) {
        for (let n of data) {
            this.matches[n.id] = n;
        }
    }
}

export default ApiService;