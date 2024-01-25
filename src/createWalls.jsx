import * as THREE from "three";

//Creates walls, floor and ceiling
export default function CreateWalls() {
  return (
    <>
      <mesh receiveShadow rotation-x={Math.PI * 0.5}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color={"#B18663"} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 15, -20]}>
        <planeGeometry args={[60, 30]} />
        <meshStandardMaterial color="#F7DCB4" side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation-y={Math.PI * 0.5} position={[-30, 15, 0]}>
        <planeGeometry args={[60, 30]} />
        <meshStandardMaterial color="#F7DCB4" side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation-y={Math.PI * 0.5} position={[30, 15, 0]}>
        <planeGeometry args={[60, 30]} />
        <meshStandardMaterial color="#F7DCB4" side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation-x={Math.PI * 0.5} position-y={30}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#F7DCB4" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}
