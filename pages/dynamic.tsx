import { GetServerSideProps, NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

interface ApiResponse {
    name: string;
    timeStamp: string; // Alterado para string, pois o valor da API é uma string
}

interface DynamicProps {
    serverSideData?: ApiResponse;
}

export const getServerSideProps: GetServerSideProps<DynamicProps> = async () => {
    const serverSideData: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/hello`).then((res) =>
        res.json()
    );

    return {
        props: {
            serverSideData,
        },
    };
};

const Dynamic: NextPage<DynamicProps> = (props) => {
    const [clientSideData, setClientSideData] = useState<ApiResponse | undefined>();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch("/api/hello").then((res) => res.json());
        setClientSideData(data);
    };

    return (
        <Container tag="main">
            <h1 className="my-5">Como funcionam as renderizações Next.js</h1>

            <Row>
                <Col>
                    <h3>Gerado no servidor:</h3>
                    <h2>{props.serverSideData?.timeStamp}</h2>
                </Col>
                <Col>
                    <h3>Gerado no cliente:</h3>
                    <h2>{clientSideData?.timeStamp}</h2>
                </Col>
            </Row>
        </Container>
    );
};



export default Dynamic;