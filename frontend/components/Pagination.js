import React from "react";
import PaginationStyles from "./styles/PaginationStyles";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { perPage } from "../config";
import Head from "next/head";
import Link from "next/link";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        const count = data.itemsConnection.aggregate.count;
        const pages = Math.ceil(count / perPage);
        const page = props.page;
        return (
          <PaginationStyles data-test="pagination">
            <Head>
              <title>
                Sick Fits! page {page} of {pages}
                
              </title>
            </Head>
            <Link
              prefetch
              href={{
                pathname: "items",
                query: { page: page - 1 }
              }}
            >
              <a className="prev" aria-disabled={page <= 1}>
                ⬅️ Prev
              </a>
            </Link>
            <p>
              Page {props.page} of <span className="totalPages">{pages < 0 ? 1 : pages}</span>
            </p>
            <Link
              href={{
                pathname: "items",
                query: { page: page + 1 }
              }}
            >
              <a className="next" aria-disabled={page >= pages}>
                Next ➡️
              </a>
            </Link>
          </PaginationStyles>
        );
      }}
    </Query>
  );
};

export default Pagination;
export { PAGINATION_QUERY };