import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "item1 item3"
    "item2 item2";
  gap: 20px 10px;
  align-items: center;
  margin: 1rem 0;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-areas:
      "item1"
      "item2"
      "item3";
  }
`;

const Item1 = styled.h2`
  grid-area: item1;
  font-size: 3.5rem;
  font-weight: 300;
  white-space: nowrap;
  & p {
    position: relative;
    &::after {
      content: "";
      width: 17rem;
      height: 2px;
      background-color: black;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
`;

const Item2 = styled.p`
  grid-area: item2;
  font-size: 1rem;
`;

const Item3 = styled.div`
  grid-area: item3;
  display: flex;
  justify-content: end;
  @media (max-width: 768px) {
    justify-content: start;
  }
`;

function Heading() {
  return (
    <Container>
      <Item1>
        <p>Media Gallery</p>
      </Item1>
      <Item2>
        Etiam vitae tortor. Curabitur nisi. In hac habitasse platea dictumst.
        Praesent ac massa at ligula laoreet iaculis. Praesent ac massa at ligula
        laoreet iaculis. sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum
        laoreet sapien, quis venenatis ante odio sit amet eros. Nullam quis
        ante. Curabitur vestibulum.
      </Item2>
      <Item3>
        <button className="bg-blue-800 hover:bg-blue-600 text-lg py-2 px-4 text-white">
          Browse
        </button>
      </Item3>
    </Container>
  );
}

export default Heading;
