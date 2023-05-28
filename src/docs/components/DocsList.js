import React from 'react'
import Button from '../../shared/components/FormElements/Button';

import Card from '../../shared/components/UIElements/Card';
import DocItem from './DocItem';

import './DocsList.css'

const DocsList = (props) => {

    if (props.items.length === 0) {
        return (
            <div className="doc-list center">
                <Card>
                    <h2>No docs found. Maybe create one</h2>
                    <Button to="/docs/new">Share Doc.</Button>
                </Card>
            </div>
        );
    }

    return (
        <ul className="doc-list">
            {props.items.map(doc => <DocItem
                key={doc.id}
                id={doc.id}
                image={doc.imageUrl}
                title={doc.title}
                description={doc.description}
                creatorId={doc.creator}
            />)}
        </ul>
    )
}

export default DocsList
