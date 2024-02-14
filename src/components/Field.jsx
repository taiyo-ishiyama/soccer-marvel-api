import React from "react";
import { useRef, useState } from "react";
import { createFileName, useScreenshot } from "use-react-screenshot";

export default function Field({ team, setTeam }) {
  const positions = ["ST", "MD1", "MD2", "DF1", "DF2", "GK"];

  const handleDeletePlayer = (index) => {
    const newTeam = [...team];
    newTeam[index] = null;
    setTeam(newTeam);
  };

  const dragPerson = useRef();
  const draggedOverPerson = useRef();

  function handleSort() {
    const teamClone = [...team];
    const temp = teamClone[dragPerson.current];
    teamClone[dragPerson.current] = teamClone[draggedOverPerson.current];
    teamClone[draggedOverPerson.current] = temp;
    setTeam(teamClone);
  }

  const containerRef = useRef(null);
  const [image, takeScreenshot] = useScreenshot({
    type: `image/jepg`,
    quality: 1.0,
  });
  const download = (image = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName("jpg", "my-team");
    a.click();
  };
  const getImage = () => {
    takeScreenshot(containerRef.current).then(download);
  };

  return (
    <div>
      <div className='soccer-field' ref={containerRef}>
        <h2>My Team</h2>
        <div className='field'>
          {positions.map((position, index) => (
            <div key={index} className={`position-${position}`}>
              <div className='position-name'>{position}</div>
              <div
                className='player'
                draggable
                onDragStart={() => (dragPerson.current = index)}
                onDragEnter={() => (draggedOverPerson.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              >
                {team[index] ? (
                  <>
                    <img
                      src={`${team[index].thumbnail.path}.${team[index].thumbnail.extension}`}
                      alt={team[index].name}
                    />
                    <button
                      className='delete-button'
                      onClick={() => handleDeletePlayer(index)}
                    >
                      X
                    </button>
                  </>
                ) : (
                  <div className='not-selected-circle'>
                    <div className='not-selected-text'>Not selected</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
        <button style={{ marginBottom: "10px" }} onClick={getImage}>
          Take screenshot
        </button>
    </div>
  );
}
