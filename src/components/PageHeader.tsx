import React from 'react';

interface PageHeaderProps {
    children: React.ReactElement<{}>;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({ children }) => (
    <header className="header">
        <h1>todos</h1>
        {children}
    </header>
);

export default PageHeader;
