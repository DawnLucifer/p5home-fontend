<template>
  <div class="render">
    <iframe name="p5" ref="p5iframe"></iframe>
    <form
        target="p5"
        style="display: none"
        method="post"
        ref="p5form"
        action="http://39.103.132.14:8000/codegen">
      <!--  TODO    -->
      <textarea
          ref="p5text"
          name="codes"
      ></textarea>
    </form>
  </div>
</template>

<script>
export default {
  name: "Render",
  mounted() {
    switch (this.type) {
      case 'render': {
        const codes = sessionStorage.getItem('codes')
        this.$refs.p5text.value = this.$store.state.codes || codes
        break
      }
      case 'home': {
        this.$refs.p5text.value = `let noiseMax = 1;
let zoff = 0;

let ca, cb;

let ox, oy;

let MAX;

function setup() {
	createCanvas(windowWidth, windowHeight);
	angleMode(DEGREES);

	ca = color("#0CCBCFAA");
	cb = color("#FE68B5AA");


	ox = width / 2;
	oy = height;

	MAX = width > height ? width : height;

	noFill();
	background("#E7ECF2");
}

function draw() {
	// background(230);

	stroke(lerpColor(ca, cb, abs(sin(zoff * 100))));
	push();
	translate(ox, oy);
	beginShape();
	for (let t = 0; t < 360; t++) {
		let xoff = map(cos(t), -1, 1, 0, noiseMax);
		let yoff = map(sin(t), -1, 1, 0, noiseMax);

		let n = noise(xoff, yoff, zoff);

		let r = map(n, 0, 1, 0, height * 1.5);
		let x = r * cos(t);
		let y = r * sin(t);

		// let c = lerpColor(ca, cb, n);

		vertex(x, y);
	}
	endShape(CLOSE);

	zoff += 0.005;
}`
      }
    }
    this.$refs.p5form.submit()

  },
  props: {
    type: {
      type: String,
      default: 'render',
    }
  }
}
</script>

<style scoped>
iframe {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  border: 0;
}

.render {
  overflow-x: hidden;
  overflow-y: hidden;
  height: 900px;
}
</style>