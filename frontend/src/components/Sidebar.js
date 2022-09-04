import Button from "react-bootstrap/Button";
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { Dropdown } from "react-bootstrap";

function Sidebar() {
    return (
      <>
        <Dropdown style={{position: 'relative', marginRight: '1vw'}}>
            <Dropdown.Toggle variant="secondary" style={{marginLeft: '1vw', position: 'relative'}}>
                Menu
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item href="/username">My Health</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      </>
    );
}

export default Sidebar;