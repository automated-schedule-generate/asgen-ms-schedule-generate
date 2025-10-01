export interface IMapper<ENTITY, MODEL> {
  toEntity(model: MODEL): ENTITY;
}
