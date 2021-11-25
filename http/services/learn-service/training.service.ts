/**
 * This file is generated by the RequestConfigGenerator.
 * Do not edit.
 */
import { Request, RequestParams } from '@gopowerteam/http-request'
import type { Observable } from 'rxjs'
import { TrainingController } from '@/http/controller/learn-service/training.controller'

export class TrainingService {
  /**
   * 活动详情
   */
  @Request({
    server: TrainingController.getTrainingDetail,
  })
  public getTrainingDetail(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * 更新基本信息
   */
  @Request({
    server: TrainingController.updateTrainingDetail,
  })
  public updateTrainingDetail(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * 获取营销配置
   */
  @Request({
    server: TrainingController.getTrainingSaleConfig,
  })
  public getTrainingSaleConfig(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * 更新营销配置
   */
  @Request({
    server: TrainingController.updateTrainingSaleConfig,
  })
  public updateTrainingSaleConfig(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * 培训发布配置
   */
  @Request({
    server: TrainingController.getTrainingRelease,
  })
  public getTrainingRelease(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * 获取培训发布配置
   */
  @Request({
    server: TrainingController.updateTrainingRelease,
  })
  public updateTrainingRelease(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * 更新活动状态
   */
  @Request({
    server: TrainingController.changeStatus,
  })
  public changeStatus(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * 活动列表(全部)
   */
  @Request({
    server: TrainingController.getTrainings,
  })
  public getTrainings(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * 创建活动
   */
  @Request({
    server: TrainingController.createTraining,
  })
  public createTraining(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * （分页）获取学员例表
   */
  @Request({
    server: TrainingController.getTrainingStudents,
  })
  public getTrainingStudents(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * 分组查看（学员）
   */
  @Request({
    server: TrainingController.getTrainingGroupStudents,
  })
  public getTrainingGroupStudents(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * 获取全部的问题
   */
  @Request({
    server: TrainingController.getAllQuestions,
  })
  public getAllQuestions(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * （分页）获取全部单订单(admin)
   */
  @Request({
    server: TrainingController.getTrainingOrders,
  })
  public getTrainingOrders(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
  /**
   * 获取订单详情
   */
  @Request({
    server: TrainingController.getTrainingOrderDetail,
  })
  public getTrainingOrderDetail(
    params?: RequestParams | { [key: string]: any }
  ): Observable<any> {
    return RequestParams.create(params).request();
  }
}
