import { PreferenceEntity } from '../../domain/entities';
import { IMapper } from '../../domain/interfaces';
import { PreferenceModel } from '../models';

export class PreferenceMapper implements IMapper<PreferenceEntity, PreferenceModel> {
  toEntity(preferenceModel: PreferenceModel): PreferenceEntity {
    return new PreferenceEntity(
      preferenceModel.id,
      preferenceModel.day,
      preferenceModel.turn,
      preferenceModel.teacher_id,
    );
  }
}
