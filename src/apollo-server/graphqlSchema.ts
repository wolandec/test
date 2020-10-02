// eslint-disable-next-line no-undef
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Operation {
    """
    ID Операции
    """
    id: ID
    """
    Тип операции
    """
    type: String
    """
    Дата проведения операции
    """
    date: String
    """
    Площадь проведения операции (Га)
    """
    area: Float
    """
    Комментарий
    """
    comment: String
    """
    Оценка качества проведенной операции
    """
    assessment: String
  }
  type Query {
    """
    Получение локали по названию. Например ru-Ru
    """
    locale(locale: String!): String
  }
`;

export default typeDefs;
