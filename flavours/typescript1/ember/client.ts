class HypeGenerator {
    constructor(public lang: string, public framework: string) { }
    run() {
        return "<h1>" + this.lang + " - " + this.framework + "</h1>";
    }
};

var engine = new HypeGenerator("TypeScript 1", "Ember.js");

document.getElementById('where_the_hype_happens_e42c4d_deadbeef').innerHTML = engine.run();
