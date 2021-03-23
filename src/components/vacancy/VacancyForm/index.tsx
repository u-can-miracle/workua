import { useState } from 'react'
import { useFormik } from 'formik';
import { Typography, Radio, Input } from 'antd'
import classnames from 'classnames'
import Heading, { Headings } from 'components/common/Heading'
import Button from 'components/common/Button'
import Autocomplete from 'components/common/Autocomplete'

import { loadCityList } from 'redux/city/actions'
import { ISelectParams, IPriceFromTo, IVacancyRequest, IVacancy } from 'interfaces'
import { isPriceFromTo } from 'utils/types'

import styles from './styles.module.scss'

const { Text } = Typography

enum SalaryType {
  range = 'range',
  singleValue = 'singleValue',
  notDeclared = 'notDeclared'
}

interface IProps {
  headerTitle: string
  initialVacancy: Omit<IVacancy, 'id'>
  onSubmit: (payload: IVacancyRequest) => void
  onCancel: () => void
}

const VacancyForm = (props: IProps) => {
  const {
    headerTitle,
    initialVacancy,
    onSubmit,
    onCancel,
  } = props

  const isPriceFromToFormat = isPriceFromTo(initialVacancy.price)
  const [salaryType, setSalaryType] = useState(SalaryType.range)

  const onChangeSalaryType = (e: any) => {
    setSalaryType(e.target.value)
  }

  const formik = useFormik({
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: {
      vacancyName: initialVacancy.name,
      cityName: initialVacancy.cityName,
      cityId: initialVacancy.cityId,
      address: initialVacancy.address || '',
      // TODO: implement normal getters for 'priceFrom', 'priceTo', 'priceSingleValue'
      priceFrom: isPriceFromToFormat ? (initialVacancy.price as IPriceFromTo).from : 0,
      priceTo: isPriceFromToFormat ? (initialVacancy.price as IPriceFromTo).to : 0,
      priceSingleValue: !isPriceFromToFormat ? Number(initialVacancy.price) : 0,
      priceComment: initialVacancy.priceComment,
    },
    validate: (values) => {
      // TODO: implement typing for 'errors' var and extract validation logic to util
      const errors: any = {}

      if (!values.vacancyName.length) {
        errors.vacancyName = 'Пожалуйста, укажите название должности.'
      }

      if (!values.cityId) {
        errors.cityId = 'Пожалуйста, укажите город работы.'
      }

      if (salaryType === SalaryType.range && (!values.priceFrom || !values.priceTo)) {
        errors.priceFrom = "Пожалуйста, укажите минимальное и максимальное значение зарплаты."
      }

      if (salaryType === SalaryType.singleValue && !values.priceSingleValue) {
        errors.priceSingleValue = "Пожалуйста, укажите значение зарплаты."
      }

      return errors
    },
    onSubmit: (values, helper) => {
      let price: number | IPriceFromTo | undefined
      if (salaryType === SalaryType.range) {
        price = {
          from: Number(values.priceFrom),
          to: Number(values.priceTo),
        }
      }

      if (salaryType === SalaryType.singleValue) {
        price = Number(values.priceSingleValue)
      }

      const payload = {
        name: values.vacancyName,
        city: values.cityId,
        address: values.address,
        price,
        priceComment: values.priceComment,
      }

      onSubmit(payload)
    },
  })

  function onSelect({ id, name }: ISelectParams) {
    formik.setFieldValue('cityId', id)
    formik.setFieldValue('cityName', name)
  }

  return (
    <>
      <Heading
        headingLevel={Headings.h1}
        className={styles.headerTitle}
        text={headerTitle}
      />

      {!formik.isValid && (
        <div className={styles.errorBlock}>
          <Heading
            className={styles.errorHeading}
            headingLevel={Headings.h2}
            text="Ошибка при заполнении формы"
          />

          <p className={styles.errorDescription}>
            Пожалуйста, отредактируйте поля, отмеченные красным, и нажмите кнопку «Сохранить».
          </p>
        </div>
      )}

      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
      >
        <div className={styles.formSection}>
          <Heading
            className={styles.heading}
            headingLevel={Headings.h2}
            text="Название должности"
            symbol="*"
            symbolStyle="danger"
          />
          <Input
            name="vacancyName"
            value={formik.values.vacancyName}
            placeholder="Оставить комментарий"
            onChange={formik.handleChange}
          />
          {formik.errors.vacancyName && (
            <Text
              className={classnames(styles.errorHeading)}
              type="danger"
            >
              {formik.errors.vacancyName}
            </Text>
          )}
        </div>

        <div className={styles.formSection}>
          <Heading
            className={styles.heading}
            headingLevel={Headings.h2}
            text="Условия работы"
          />

          <div>Город работы<span>*</span>:</div>
          { /* TODO: fix triggering error after selecting */ }
          <Autocomplete
            onFetch={loadCityList}
            onSelect={onSelect}
            handleBlur={() => formik.validateField('cityId')}
          />
          {formik.errors.cityId && (
            <Text
              className={classnames(styles.errorHeading)}
              type="danger"
            >
              {formik.errors.cityId}
            </Text>
          )}

          <div className={styles.address}>Адрес работы<span>*</span>:</div>
          <Input
            name="address"
            value={formik.values.address}
            placeholder="Улица и дом"
            onChange={formik.handleChange}
          />
        </div>

        <div className={styles.formSection}>
          <Heading
            className={styles.heading}
            headingLevel={Headings.h2}
            text="Зарплата"
            symbol="*"
            symbolStyle="danger"
          />

          <Radio.Group onChange={onChangeSalaryType} value={salaryType}>
            <div>
              <Radio value={SalaryType.range}>Диапазон</Radio>
              {salaryType === SalaryType.range && (
                <div>
                  <Input
                    className={styles.priceInput}
                    name="priceFrom"
                    value={String(formik.values.priceFrom)}
                    placeholder="от"
                    onChange={formik.handleChange}
                  />
                  <span className={styles.priceDelimiter} />
                  <Input
                    className={styles.priceInput}
                    name="priceTo"
                    value={String(formik.values.priceTo)}
                    placeholder="до"
                    onChange={formik.handleChange}
                  />

                  {formik.errors.priceFrom && (
                    <Text
                      className={classnames(styles.errorHeading)}
                      type="danger"
                    >
                      {formik.errors.priceFrom}
                    </Text>
                  )}
                </div>
              )}
            </div>
            <div>
              <Radio value={SalaryType.singleValue}>Одно значение</Radio>
              {salaryType === SalaryType.singleValue && (
                <div>
                  <Input
                    className={styles.priceInput}
                    name="priceSingleValue"
                    value={String(formik.values.priceSingleValue)}
                    placeholder="Зарплата"
                    onChange={formik.handleChange}
                  />

                  {formik.errors.priceSingleValue && (
                    <Text
                      className={classnames(styles.errorHeading)}
                      type="danger"
                    >
                      {formik.errors.priceSingleValue}
                    </Text>
                  )}
                </div>
              )}
            </div>
            <div>
              <Radio value={SalaryType.notDeclared}>
                Не указывать <span>(не рекомендуется)</span>
              </Radio>
            </div>
          </Radio.Group>

          <div className={styles.priceCommentLabel}>Комментарий к зарплате<span>*</span>:</div>
          <Input
            className={styles.priceCommentInput}
            name="priceComment"
            value={formik.values.priceComment}
            onChange={formik.handleChange}
          />
        </div>

        <div className={styles.formSection}>
          <Button
            type="submit"
            style="primary"
            btnTitle="Сохранить"
          /> или
          <Button
            className={styles.cancel}
            isLink
            style="error"
            btnTitle="Отменить"
            onClick={onCancel}
          />
        </div>
      </form>
    </>
  )
}

export default VacancyForm
