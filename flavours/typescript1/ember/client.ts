class HypeGenerator {
    constructor(public lang: string, public framework: string) { }
    string_factory() {
        return "<h1>" + this.lang + " - " + this.framework + "</h1>";
    }

    render(element_id: string, callback: any) {
        document.getElementById(element_id).innerHTML = this.string_factory();
        callback();
    }
};

new HypeGenerator("TypeScript 1", "Ember.js").render('where_the_hype_happens_e42c4d_deadbeef', ()=>{});


