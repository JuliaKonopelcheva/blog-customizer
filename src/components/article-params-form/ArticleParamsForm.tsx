import { useState, useRef, FormEvent } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import {
	ArticleStateType,
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	// Пропсы: текущее состояние статьи и функция для его обновления
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	// Состояние: открыта ли панель настроек
	const [isOpen, setOpen] = useState(false);

	// Локальное состояние формы
	const [formState, setFormState] =
		useState<ArticleStateType>(currentArticleState);

	// Ref для отслеживания кликов вне панели настроек
	const asideRef = useRef<HTMLDivElement | null>(null);

	// Хук, закрывающий панель настроек при клике вне ее области
	useOutsideClickClose({
		rootRef: asideRef,
		isOpen,
		onChange: setOpen,
		onClose: () => setOpen(false),
	});

	// Применение формы (нажатие "Применить")
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		setCurrentArticleState(formState);
		setOpen(false);
	};

	// Сброс формы и глобального состояния (нажатие "Сбросить")
	const handleReset = () => {
		setFormState(defaultArticleState);
		setCurrentArticleState(defaultArticleState);
		setOpen(false);
	};

	return (
		<>
			{/* Кнопка открытия/закрытия панели */}
			<ArrowButton isOpen={isOpen} onClick={() => setOpen((prev) => !prev)} />

			{/* Панель настроек */}
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				{/* Форма редактирования */}
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					{/* Выбор шрифта */}
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option: OptionType) =>
							setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
						}
					/>

					{/* Выбор размера шрифта */}
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option: OptionType) =>
							setFormState((prev) => ({ ...prev, fontSizeOption: option }))
						}
					/>

					{/* Выбор цвета текста */}
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option: OptionType) =>
							setFormState((prev) => ({ ...prev, fontColor: option }))
						}
					/>

					<Separator />

					{/* Выбор цвета фона */}
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option: OptionType) =>
							setFormState((prev) => ({ ...prev, backgroundColor: option }))
						}
					/>

					{/* Выбор ширины контейнера */}
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option: OptionType) =>
							setFormState((prev) => ({ ...prev, contentWidth: option }))
						}
					/>

					{/* Кнопки управления */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
