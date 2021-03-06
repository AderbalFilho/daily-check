import { useEffect, useState } from 'react';
import { Alert, Button, Checkbox, Icon, Text } from '@blueprintjs/core';
import { Tooltip2 } from "@blueprintjs/popover2";

import * as S from './styles.js';

function TeamList() {
  const [teamList, setTeamList] = useState();
  const [orderedTeamList, setOrderedTeamList] = useState();
  const [randomTeammate, setRandomTeammate] = useState();
  const [lastSpoken, setLastSpoken] = useState();
  const [lastChecked, setLastChecked] = useState();
  const [rgpdConsent, setRgpdConsent] = useState(false);
  const [firstOpened, setFirstOpened] = useState(true);
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

    if (Object.keys(unchecked).length === 0) {
      setLastSpoken(lastChecked);

      if (rgpdConsent) {
        localStorage.setItem('last-spoken', lastChecked);
      }
    }

    setOrderedTeamList({ ...unchecked, ...checked });
  };
  const handleEnabledChange = (name) => {
    setLastChecked(name);
  };
  const getJson = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setTeamList(JSON.parse(e.target.result));
      setLastSpoken('');

      if (rgpdConsent) {
        localStorage.setItem('team-list', e.target.result);
      }
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
  const handleReset = () => {
    orderTeamList();
    setRandomTeammate();
  }
  const handleClose = (confirm) => {
    if (confirm) {
      setRgpdConsent(true);
      localStorage.setItem('rgpd-consent', 'true');
    }

    setFirstOpened(false);
  }
  const resetLastSpoken = () => {
    setLastSpoken('');

    if (rgpdConsent) {
      localStorage.setItem('last-spoken', '');
    }
  }

  useEffect(() => {
    const consent = localStorage.getItem('rgpd-consent') === 'true';

    setRgpdConsent(consent);
  }, []);

  useEffect(() => {
    if (rgpdConsent) {
      const team = JSON.parse(localStorage.getItem('team-list'));
      setLastSpoken(localStorage.getItem('last-spoken'));

      if (team) {
        setTeamList(team);
      }
    }
  }, [rgpdConsent]);

  useEffect(() => {
    if (teamList) {
      orderTeamList();
    }
  }, [teamList]);
  useEffect(() => {
    if (lastChecked) {
      orderTeamList({
        ...orderedTeamList,
        [lastChecked]: { ...orderedTeamList[lastChecked], checked: !orderedTeamList[lastChecked].checked }
      });
    }
  }, [lastChecked]);

  return (
    <S.Container>
      {!rgpdConsent && (
        <Alert
          isOpen={firstOpened}
          canEscapeKeyCancel={true}
          canOutsideClickCancel={true}
          onClose={handleClose}
        >
          <Text>
            This site uses cookies (namely localStorage to save your JSON, this answer and last one who spoke) to improve its performance.
          </Text>
        </Alert>
      )}
      {lastSpoken && (
        <S.LastSpoken>
          <Text>
            <b>Last one who spoke: {lastSpoken}</b>
          </Text>
          <S.ResetLastSpoken intent="primary" text="OK" onClick={() => resetLastSpoken()} />
        </S.LastSpoken>
      )}
      {orderedTeamList && (
        <>
          {Object.entries(orderedTeamList).map(([name, details]) => {
            return <Checkbox key={name} label={name} checked={details.checked} large={true} onChange={() => handleEnabledChange(name)} />;
          })}
          <S.StyledButtonGroup>
            <Button icon="clean" intent="primary" text="Choose random" onClick={() => handleRandom()} />
            <Button icon="refresh" intent="danger" text="Reset" onClick={() => handleReset()} />
          </S.StyledButtonGroup>
          {randomTeammate && <S.StyledText><b>Random result: {randomTeammate}</b></S.StyledText>}
        </>
      )}
      <S.UploadInfo>
        <S.StyledFileInput onInputChange={getJson} />
        <Tooltip2
          content={`
            JSON format:
            {
              "Aderbal": {
                "checked": false
              },
              "Anyone else": {
                "checked": true
              }
            }
          `}
          placement="top"
        >
          <Icon icon="info-sign" intent="primary" />
        </Tooltip2>
      </S.UploadInfo>
    </S.Container>
  );
}

export default TeamList;
