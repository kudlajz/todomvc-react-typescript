import React from 'react';

interface PageHeaderProps {
    children: React.ReactNode;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = ({
    children,
}): React.ReactElement<PageHeaderProps> => (
    <header className="header">
        <h1>todos</h1>
        {children}
    </header>
);

export default PageHeader;
