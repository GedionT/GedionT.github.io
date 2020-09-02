import React from "react";
import ParticlesBg from "particles-bg";

let config = {
  num: 50,
  rps: 0.1,
  radius: 2,
  life: [1.5, 3],
  g: 5, // gravity
  f: [2, -1], // force
  onParticleUpdate: (ctx, particle) => {
    ctx.beginPath();
    ctx.rect(
      particle.p.x,
      particle.p.y,
      particle.radius * 2,
      particle.radius * 2
    );
    ctx.fillStyle = particle.color;
    ctx.fill();
    ctx.closePath();
  }
};

export default function Background() {
  return <ParticlesBg type="cobweb" config={config} bg={true} />;
}
