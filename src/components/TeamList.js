import { useEffect, useState } from 'react';
import { Button, Checkbox } from '@blueprintjs/core';

import * as S from './styles.js';

function TeamList() {
  const [teamList, setTeamList] = useState();
  const [orderedTeamList, setOrderedTeamList] = useState();
  const [randomTeammate, setRandomTeammate] = useState();
  const orderObjectByKey = (object) => {
    return Object.keys(object).sort().reduce(
      (obj, key) => {
        obj[key] = object[key];
        return obj;
      },
      {}
    );
  };
  const orderTeamList = (newTeamList) => {
    let checked = {};
    let unchecked = {};

    newTeamList = newTeamList || teamList;

    Object.keys(newTeamList).forEach(key => {
      if (newTeamList[key].checked) {
        checked = { [key]: newTeamList[key], ...checked };
      } else {
        unchecked = { [key]: newTeamList[key], ...unchecked };
      }
    });

    checked = orderObjectByKey(checked);
    unchecked = orderObjectByKey(unchecked);

    setOrderedTeamList({ ...unchecked, ...checked });
  };
  const handleEnabledChange = (name) => {
    orderTeamList({
      ...orderedTeamList,
      [name]: { ...orderedTeamList[name], checked: !orderedTeamList[name].checked }
    });
  };
  const getJson = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setTeamList(JSON.parse(e.target.result));
      localStorage.setItem('team-list', e.target.result);
    };
  };
  const handleRandom = () => {
    const unchecked = [];

    Object.keys(orderedTeamList).forEach(key => {
      if (!orderedTeamList[key].checked) {
        unchecked.push(key);
      }
    });

    setRandomTeammate(unchecked[Math.floor(Math.random() * unchecked.length)]);
  }

  useEffect(() => {
    const team = JSON.parse(localStorage.getItem('team-list'));

    if (team) {
      setTeamList(team);
    }
  }, []);

  useEffect(() => {
    if (teamList) {
      orderTeamList();
    }
  }, [teamList]);

  return (
    <S.Container>
      {orderedTeamList && (
        <>
          {Object.entries(orderedTeamList).map(([name, details]) => {
            return <Checkbox key={name} label={name} checked={details.checked} large={true} onChange={() => handleEnabledChange(name)} />;
          })}
          <S.StyledButtonGroup>
            <Button icon="clean" intent="primary" text="Choose random" onClick={() => handleRandom()} />
            <Button icon="refresh" intent="danger" text="Reset" onClick={() => orderTeamList()} />
          </S.StyledButtonGroup>
          {randomTeammate && <S.StyledText><b>Random result: {randomTeammate}</b></S.StyledText>}
        </>
      )}
      <S.StyledFileInput onInputChange={getJson} />
    </S.Container>
  );
}

export default TeamList;